package com.example.straviatec.model;
import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Namespace;
import org.simpleframework.xml.Root;

import java.util.List;

@Root(name = "gpx")
@Namespace(reference = "http://www.topografix.com/GPX/1/1", prefix = "")
public class Gpx {

    @Attribute(name = "version")
    private String version;

    @Namespace(reference = "http://www.w3.org/2001/XMLSchema-instance", prefix = "xsi")
    @Attribute(name = "schemaLocation")
    private String schemaLocation;
    @ElementList(inline = true)
    private List<Waypoint> waypoints;

    public Gpx(String version, String schemaLocation, List<Waypoint> waypoints) {
        this.waypoints = waypoints;
        this.schemaLocation = schemaLocation;
        this.version = version;
    }
}
