const addUserDataLayer =(session)=>{
    window.dataLayer = window.dataLayer || []; 
    window.dataLayer.push({ 
   'gtm.load': session == null || typeof(session) == 'undefined' ? "" : session 
    });
}

export {addUserDataLayer}