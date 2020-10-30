const nameErrorBinder = (err) => 
    (name) => ({
        name: name,
        error: err[name]
    })
;

export default nameErrorBinder;