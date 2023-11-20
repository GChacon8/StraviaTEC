package com.example.straviatec;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.SystemClock;
import android.provider.DocumentsContract;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Chronometer;
import android.widget.TextView;
import android.widget.Toast;

import com.example.straviatec.model.Waypoint;
import com.example.straviatec.model.Gpx;

import java.io.File;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

public class MainActivity extends AppCompatActivity implements LocationListener {

    protected double latitude, longitude;
    TextView txtDistance;

    Chronometer chronometer;
    Button button;

    LocationManager locationManager;

    private Location lastLocation;

    private float totalDistance = 0.0f;
    String strDistance;

    Boolean onGo = false;

    List<Waypoint> waypoints = new ArrayList<>();

    String start,finish;

    private final ActivityResultLauncher<Intent> safLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == RESULT_OK) {
                    Intent data = result.getData();
                    if (data != null && data.getData() != null) {
                        Uri uri = data.getData();
                        writeToFile(uri);
                    }
                }
            }
    );

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        chronometer = findViewById(R.id.chronometer);
        txtDistance = (TextView) findViewById(R.id.txtDistance);
        button = (Button) findViewById(R.id.button);
        finish = getString(R.string.Finish);
        start = getString(R.string.Start);

        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        if (ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{ Manifest.permission.ACCESS_FINE_LOCATION}, 100);
        }

        if (ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 101);
        }

    }

    @Override
    public void onLocationChanged(@NonNull Location location) {
        latitude = location.getLatitude();
        longitude = location.getLongitude();

        waypoints.add(new Waypoint(latitude,longitude));

        if (lastLocation != null) {
            // Calcula la distancia entre las ubicaciones
            float distance = lastLocation.distanceTo(location);
            // Agrega la distancia a la distancia total
            totalDistance += distance;
            int dist_int = Math.round(totalDistance);
            strDistance = String.valueOf(dist_int)+" m";
            txtDistance.setText(String.valueOf(strDistance));
        }
        // Actualiza la última ubicación conocida
        lastLocation = location;

    }

    @Override
    public void onLocationChanged(@NonNull List<Location> locations) {
        LocationListener.super.onLocationChanged(locations);
    }

    @Override
    public void onFlushComplete(int requestCode) {
        LocationListener.super.onFlushComplete(requestCode);
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
        LocationListener.super.onStatusChanged(provider, status, extras);
    }

    @Override
    public void onProviderEnabled(@NonNull String provider) {
        LocationListener.super.onProviderEnabled(provider);
    }

    @Override
    public void onProviderDisabled(@NonNull String provider) {
        LocationListener.super.onProviderDisabled(provider);
    }

    public void buttonFoo(View view){
        if (!onGo){
            totalDistance = 0.0f;
            lastLocation = null;
            String dist_rest = getString(R.string.Distance);
            txtDistance.setText(dist_rest);

            chronometer.setBase(SystemClock.elapsedRealtime());
            if (ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED){
                ActivityCompat.requestPermissions(MainActivity.this, new String[]{ Manifest.permission.ACCESS_FINE_LOCATION}, 100);
            }

            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000, 0, this);

            chronometer.start();
            onGo = true;
            button.setText(finish);
        }
        else {
            chronometer.stop();
            locationManager.removeUpdates(this);
            System.out.println(waypoints);

            Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
            intent.addCategory(Intent.CATEGORY_OPENABLE);
            intent.setType("application/gpx+xml");
            intent.putExtra(Intent.EXTRA_TITLE, "TrackGPX.gpx");
            intent.putExtra(DocumentsContract.EXTRA_INITIAL_URI, Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toURI());

            safLauncher.launch(intent);

            onGo = false;
            button.setText(start);

        }
    }
    private void writeToFile(Uri uri) {
        try {
            OutputStream outputStream = getContentResolver().openOutputStream(uri);

            if (outputStream != null) {
                String xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n";
                outputStream.write(xmlHeader.getBytes());
                Serializer serializer = new Persister();
                Gpx gpx = new Gpx("1.1", "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd", waypoints);
                System.out.println("Entra WRITE");
                serializer.write(gpx, outputStream);
                outputStream.close();
                waypoints.clear();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}