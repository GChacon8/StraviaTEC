package com.example.straviatec.model;
import org.simpleframework.xml.Element;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

@Root(name = "trkpt")
public class Waypoint {

    @Element
    private double lat;

    @Element
    private double lon;

    public Waypoint(double lat, double lon) {
        this.lat = lat;
        this.lon = lon;
    }
}
