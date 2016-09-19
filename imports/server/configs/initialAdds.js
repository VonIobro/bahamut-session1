import {ServerMessages} from '../lib/collections';

ServerMessages.insert({
  date: new Date(),
  type: 'message',
  args: 'System Restarted',
});
