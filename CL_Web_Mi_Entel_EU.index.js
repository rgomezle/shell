require(["es6-promise", "tslib"], function (es6promise, tslib) {
require(["OutSystems/ClientRuntime/Settings"], function (OutSystemsSettings) {
OutSystemsSettings.setPlatformSettings({
IndexedDBOffline: true,
UseNewWebSQLImpl: false,
SendEnvParamOnManifestRequest: false
});
require(["OutSystems/ClientRuntime/Main", "CL_Web_Mi_Entel_EU.appDefinition", "OutSystems/ClientRuntime/Debugger"], function (OutSystems, CL_Web_Mi_Entel_EUAppDefinition, Debugger) {
var OS = OutSystems.Internal;
if(OS.Navigation.ensureRequestSecurity()) {
return;
}

OutSystemsDebugger.initialize().then(function () {
return OS.Application.initialize(CL_Web_Mi_Entel_EUAppDefinition, OS.Interfaces.Application.InitializationType.Full, new OS.Format.DateTimeFormatInfo("yyyy-MM-dd", "HH:mm:ss"), new OS.Format.NumberFormatInfo(".", ""), function () {
return Promise.all(["scripts/EntelOS_TH.jQuery.js"].map(function (script) {
return OS.SystemActions.requireScript(script);
}));
}).then(function (success) {
function initViewPromise() {
return OS.Flow.promise(function (resolve, reject) {
require(["OutSystems/ReactView/Main"], function (OSView) {
try {OSView.Router.load(OS.Application);
resolve();
} catch (success) {
reject(success);
}

});
});
};
if(success) {
return initViewPromise();
}


});
}).catch(function (success) {
OS.ErrorHandling.handleError(success);
});
});
});
});