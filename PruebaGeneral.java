import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class PruebaGeneral {
    public static void main(String[] args) {
        try (Connection conn = ConexionBD.getConnection();
             Statement stmt = conn.createStatement()) {

            System.out.println("✅ Conexión exitosa a funcionarios_db");

            // 1. JOIN extendido
            System.out.println("\n📌 Funcionarios con inventarios detallados:");
            ResultSet rsJoinExtendido = stmt.executeQuery(
                "SELECT DISTINCT " +
                "f.nombre AS funcionario, " +
                "i.nombre AS inventario, " +
                "e.nombre AS estado_equipo, " +
                "m.nombre AS marca, " +
                "t.nombre AS tipo_equipo " +
                "FROM funcionarios f " +
                "JOIN funcionarios_inventarios fi ON f.id = fi.funcionario_id " +
                "JOIN inventarios i ON i.id = fi.inventario_id " +
                "LEFT JOIN estados e ON i.estado_id = e.id " +
                "LEFT JOIN marcas m ON i.marca_id = m.id " +
                "LEFT JOIN tipos t ON i.tipo_id = t.id"
            );

            while (rsJoinExtendido.next()) {
                System.out.println(
                    rsJoinExtendido.getString("funcionario") + " - " +
                    rsJoinExtendido.getString("inventario") + " - " +
                    (rsJoinExtendido.getString("estado_equipo") != null ? rsJoinExtendido.getString("estado_equipo") : "Sin estado") + " - " +
                    (rsJoinExtendido.getString("marca") != null ? rsJoinExtendido.getString("marca") : "Sin marca") + " - " +
                    (rsJoinExtendido.getString("tipo_equipo") != null ? rsJoinExtendido.getString("tipo_equipo") : "Sin tipo")
                );
            }

            // 2. CRUD sobre funcionarios
            System.out.println("\n📌 Probando CRUD sobre funcionarios:");

            // INSERT
            String insertSQL = "INSERT INTO funcionarios (nombre, cargo, dependencia) " +
                               "VALUES ('Juan Veintemillo', 'Docente', 'Física')";
            int filasInsertadas = stmt.executeUpdate(insertSQL);
            if (filasInsertadas > 0) {
                System.out.println("✅ Funcionario insertado: Juan Veintemillo");
            }

            // UPDATE
            String updateSQL = "UPDATE funcionarios SET dependencia='Química' WHERE nombre='Juan Veintemillo'";
            int filasActualizadas = stmt.executeUpdate(updateSQL);
            if (filasActualizadas > 0) {
                System.out.println("✅ Funcionario actualizado: Juan Veintemillo → Química");
            }

            // DELETE
            String deleteSQL = "DELETE FROM funcionarios WHERE nombre='Juan Veintemillo'";
            int filasEliminadas = stmt.executeUpdate(deleteSQL);
            if (filasEliminadas > 0) {
                System.out.println("✅ Funcionario eliminado: Juan Veintemillo");
            }

            // 3. CRUD sobre usuarios
            System.out.println("\n📌 Probando CRUD sobre usuarios:");

            // INSERT usuario de prueba
            String insertUser = "INSERT INTO usuarios (nombre, email, password, rol) " +
                                "VALUES ('Usuario Prueba', 'usuario.prueba@correo.com', " +
                                "'$2b$10$abcdefghijklmnopqrstuv1234567890abcd', 'docente')";
            int filasUserInsertadas = stmt.executeUpdate(insertUser);
            if (filasUserInsertadas > 0) {
                System.out.println("✅ Usuario insertado: Usuario Prueba");
            }

            // UPDATE rol del usuario
            String updateUser = "UPDATE usuarios SET rol='admin' WHERE email='usuario.prueba@correo.com'";
            int filasUserActualizadas = stmt.executeUpdate(updateUser);
            if (filasUserActualizadas > 0) {
                System.out.println("✅ Usuario actualizado: Usuario Prueba → admin");
            }

            // DELETE usuario
            String deleteUser = "DELETE FROM usuarios WHERE email='usuario.prueba@correo.com'";
            int filasUserEliminadas = stmt.executeUpdate(deleteUser);
            if (filasUserEliminadas > 0) {
                System.out.println("✅ Usuario eliminado: Usuario Prueba");
            }

        } catch (Exception e) {
            System.out.println("❌ Error en la operación general");
            e.printStackTrace();
        }
    }
}
