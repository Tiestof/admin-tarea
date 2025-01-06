const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.deleteTask = functions.https.onCall(async (data, context) => {
  console.log("INICIO de deleteTask");
  console.log("Datos recibidos:", data);

  const {taskId} = data.data;
  console.log("taskId extraído:", taskId);

  // Validamos el  de taskId
  if (!taskId) {
    console.error("Error: taskId no proporcionado");
    throw new functions.https.HttpsError(
        "invalid-argument",
        "El campo taskId es obligatorio.",
    );
  }

  try {
    console.log("Intentando eliminar tarea con ID:", taskId);

    // Verificamos si el documento existe usando el taskID
    const taskDoc = await db.collection("tareas").doc(taskId).get();
    console.log("Documento obtenido:", taskDoc.exists);

    if (!taskDoc.exists) {
      console.error("Error: La tarea no existe:", taskId);
      throw new functions.https.HttpsError(
          "not-found",
          "La tarea no existe.",
      );
    }

    // Eliminamos el documento de la firestore
    await db.collection("tareas").doc(taskId).delete();
    console.log("Tarea eliminada correctamente:", taskId);

    return {message: "Tarea eliminada correctamente"};
  } catch (error) {
    console.error("Error CATCH al eliminar tarea:", error.message);

    throw new functions.https.HttpsError(
        "internal",
        "No se pudo eliminar la tarea.",
        error.message,
    );
  } finally {
    console.log("FIN de deleteTask"); // Log al final de la ejecución
  }
});
