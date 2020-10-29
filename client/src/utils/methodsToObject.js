const methodsToObject = (methods, mapFunction = (method) => method) => {
    const result = {};
    methods.forEach((method) => result[method] = mapFunction(method));
    return result;
};

export default methodsToObject;