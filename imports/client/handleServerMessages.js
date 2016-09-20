export default function HandleServerMessages(id, fields) {
  // filter out messages older than 500ms
  const cutTime = new Date().valueOf() - 1000;
  const msgTime = fields.date.valueOf();
  console.log('cut: ' + cutTime);
  console.log('msg: ' + msgTime);
  if (msgTime < cutTime) {
    return;
  }

  // depending on 'type', do stuff
  if (fields.type === 'notification') {
    system.addNotification(fields);
  }

  if (fields.type === 'newUser') {
    system.addNotification(id, fields);
  }
}

class System {
  constructor() {
    this.message = {};
  }
  addNotification(id, fields) {
    this.message = {
      _id: id,
      text: `Enter ${fields.username}`,
      style: 'warning'
    };
  }
}

export const system = new System();
