import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;
import java.io.FileInputStream;

public class ConexionBD {
    private static Connection conn = null;

    public static Connection getConnection() {
        if (conn == null) {
            try {
                Properties props = new Properties();
                props.load(new FileInputStream("db.properties"));

                String url = props.getProperty("db.url");
                String user = props.getProperty("db.user");
                String password = props.getProperty("db.password");

                conn = DriverManager.getConnection(url, user, password);
                System.out.println("✅ Conexión establecida con la BD");
            } catch (Exception e) {
                System.out.println("❌ Error al conectar con la BD");
                e.printStackTrace();
            }
        }
        return conn;
    }

    // Método main para probar la conexión
    public static void main(String[] args) {
        Connection prueba = ConexionBD.getConnection();
        if (prueba != null) {
            System.out.println("Puedes empezar a ejecutar consultas desde Java.");
        }
    }
}
