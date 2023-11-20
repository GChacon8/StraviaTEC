using System.Xml;

XmlDocument gpxDoc = new XmlDocument();
gpxDoc.Load("./Track2GPX.gpx");

//XmlNodeList nl = gpxDoc.SelectNodes("trkpt");

XmlNamespaceManager nsmgr = new XmlNamespaceManager(gpxDoc.NameTable);
nsmgr.AddNamespace("x", "http://www.topografix.com/GPX/1/1");            
XmlNodeList nl = gpxDoc.SelectNodes("//x:trkpt", nsmgr);

foreach (XmlNode xnode in nl)
{
    //XmlAttributeCollection nodes = xnode.Attributes;
    string[] coords = xnode.InnerXml.Split(">");

    string[] lat = coords[1].Split("<");
    string[] lon = coords[3].Split("<");

    /*XmlNode latitude = nodes.GetNamedItem("lat");
    string lat = latitude.InnerText;

    XmlNode longitude = nodes.GetNamedItem("lon");
    string lon = longitude.InnerText;

    Console.WriteLine("[{0}, {1}]", lat, lon);
    */
    Console.WriteLine("[{0}, {1}]", lat[0], lon[0]);
}