import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

//console.log('jsonConvert:OperationMode', typeof import.meta.env.VITE_APP_LOGGING);
const operationMode =
   OperationMode.ENABLE;

const jsonConvert: JsonConvert = new JsonConvert();
jsonConvert.operationMode = operationMode; // print some debug data
jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL; // never allow null
jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.

export { jsonConvert };
