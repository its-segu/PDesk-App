export const confirmedAppointment = (store, appointment) => {
  const confirmed = store.state.confirmedAppointments.push(appointment);
  store.setState();

};

export const deleteFromMySet = (store, deletedJoke) => {
  var index = store.state.confirmedAppointments.indexOf(deletedJoke);
  if (index > -1) {
    store.state.myJokes.splice(index, 1);
  }
  store.setState();
};

export const showDialog = (store, open) =>  {
  console.log(open)
  const openStatus = open;
  store.setState({ showDialog: openStatus });
}

export const closeDialog = (store, close) =>  {
  console.log(close)
  const closeStatus = close;
  store.setState({ showDialog: closeStatus });
}
