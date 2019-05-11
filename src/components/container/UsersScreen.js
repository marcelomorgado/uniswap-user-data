import React from "react";
import UsersTable from "../presentational/UsersTable";

const data = [
  ["0x123", 159],
  ["0x456", 237],
  ["0x789", 262],
  ["0x987", 305],
  ["0x654", 356],
];

let id = 0;
function createData(userId, etherBalance) {
  id += 1;
  return { id, userId, etherBalance };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = data[Math.floor(Math.random() * data.length)];
  rows.push(createData(...randomSelection));
}

function UsersScreen() {
  return <UsersTable rows={rows} />;
}

export default UsersScreen;
