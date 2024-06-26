import React from "react";
import {
  DiagnosticType,
  getAllDiagnostics,
} from "../../../services/diagnosticService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const SavedDisgnosticsPage = () => {
  const [diagnostics, setDiagnostics] = React.useState<DiagnosticType[]>([]);
  const getData = async () => {
    let data = await getAllDiagnostics();
    let filteredData = data.map((doc) => ({
      ...doc.data(),
    })) as unknown[];

    setDiagnostics(filteredData as DiagnosticType[]);
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-5 w-full">
      <h1 className="font-kalnia text-3xl">Diagnostiques enregistres</h1>
      <TableContainer className="w-full overflow-x-scroll mt-5">
        <Table className="w-[1300px]">
          <TableHead className="bg-gray-100">
            <TableCell className="font-rubik font-medium">
              ID du patient
            </TableCell>
            <TableCell className="font-rubik font-medium">
              Nom du patient
            </TableCell>
            <TableCell className="font-rubik font-medium">Age</TableCell>

            <TableCell className="font-rubik font-medium">Taille</TableCell>
            <TableCell className="font-rubik font-medium">Poids</TableCell>
            <TableCell className="font-rubik font-medium">
              Groupe sanguin
            </TableCell>
            <TableCell className="font-rubik font-medium">Sexe</TableCell>
            <TableCell className="font-rubik font-medium">Symptomes</TableCell>
          </TableHead>
          <TableBody>
            {diagnostics.map((diagnostic) => (
              <TableRow key={diagnostic.patientId}>
                <TableCell className="font-rubik font-medium">
                  {diagnostic.patientId}
                </TableCell>
                <TableCell className="font-rubik font-medium">
                  {diagnostic.patientName}
                </TableCell>
                <TableCell className="font-rubik font-medium">
                  {diagnostic.patientInfo.age}
                </TableCell>

                <TableCell className="font-rubik font-medium">
                  {diagnostic.patientInfo.height}
                </TableCell>
                <TableCell className="font-rubik font-medium">
                  {diagnostic.patientInfo.weight}
                </TableCell>
                <TableCell className="font-rubik font-medium">
                  {diagnostic.patientInfo.bloodType}
                </TableCell>
                <TableCell className="font-rubik font-medium">
                  {diagnostic.patientInfo.sex}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SavedDisgnosticsPage;
