import cron  from 'node-cron';

cron.schedule('0 8 * * *', () => {
  console.log('running a task every minute');
});