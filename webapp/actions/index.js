import { HTML5_HISTORY,FOOTER_ACTIVE,GET_TICKET_4_JS,FLOW_RECHARGE_CHECK ,TBL_FORM_CHECK} from '../constants/actiontypes';
// import { shouldFetchJSON,fetchJSON } from './fetchJSON';
export * from './fetchJSON';
export const checkFlowRecharge = (opt) => ({
  type: FLOW_RECHARGE_CHECK,
  flowOpt:opt
});


export const checkTblForm = (opt) => ({
  type: TBL_FORM_CHECK,
  tblFormOpt:opt
});
