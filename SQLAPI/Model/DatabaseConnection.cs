using System.Data.SqlClient;

namespace SQLAPI.Model
{
    public class DatabaseConnection
    {
        private static readonly string constr = "Server=tcp:straviatecg4.database.windows.net,1433;Initial Catalog=StraviaTec;Persist Security Info=False;User ID=Grupo4;Password=claveBASES.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        private static SqlConnection connection;

        private DatabaseConnection()
        {
        }

        public static SqlConnection GetConnection()
        {
            if (connection == null)
            {
                connection = new SqlConnection(constr);
            }
            return connection;
        }
    }
}



   

