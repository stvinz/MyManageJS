const nameErrorBinder = (err) => 
    (name) => ({
        name: name,
        err: err[name]
    })
;

export default nameErrorBinder;