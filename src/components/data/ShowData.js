import React from 'react';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import DUMMY_DATA, { DUMMY_DATA_CLASSROOMS } from './data';

function ShowData() {

    const columns = [
        { title: "No.", field: "id" },
        { title: "DOCUMENTO", field: "documento" },
        { title: "NOMBRE", field: "nombre" },
        { title: "SALON", field: "salon" },
    ]






    const downloadPdf = () => {
        const doc = new jsPDF()
        let studentsforClassRoom = []
        DUMMY_DATA_CLASSROOMS.map((classRoom) => {
            const namePerClassRoom = ""+classRoom.classRoomName
            console.log(classRoom)
            console.log(namePerClassRoom)

            doc.text("Universidad del bosque", 105, 10, null, null, "center")
            doc.text("Proceso de admisiones pregrado de Medicina", 105, 20, null, null, "center")
            doc.text("Segundo Periodo Academico de 2022", 105, 30, null, null, "center")
            doc.text('Salon '+ namePerClassRoom, 105, 40, null, null, "center")
            let id = 1;

            studentsforClassRoom = classRoom.students.map((student => [
                id++,
                student.documento,
                student.nombre,
                student.salon
            ])
            )
            doc.autoTable({
                startY: 50,
                theme: "striped",
                columns: columns.map((col) => ({ ...col, datakey: col.field })),
                body: studentsforClassRoom
            })
    
            doc.addPage()
        }






        )       

        doc.output('dataurlnewwindow');
    }


    return (
        <div className="App">
            <h1 align="center">React-App</h1>
            <h4 align='center'>Export Data to Pdf in Material Table</h4>
            <button onClick={downloadPdf}>Exportar</button>

        </div>
    );
}

export default ShowData;