# Process

- Ran `meteor create meteorApp`
- Ran `react-native init rnApp`
- Start meteor server and react native
- Ran `npm install aleclarson/meteor-client#1.1.7 aleclarson/ddp#1.2.0 --save` in rnApp directory
- Connected to meteor server following https://github.com/aleclarson/meteor-client#usage
- Ran `npm install aleclarson/mongo#1.1.1 --save` in rnApp directory
- Initialize connection following https://github.com/aleclarson/mongo#usage
- Ran `meteor remove autopublish insecure` in meteorApp
- Updated meteor app to display items. Setup pub/sub
