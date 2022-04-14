const Sources = {
    CLOUD: 'cloud',
    SELF_HOSTED: 'self-hosted',
    LOCAL: 'local'
};

if (!Object.isFrozen(Sources)) {
    Object.freeze(Sources);
}

module.exports = { 
    Sources 
};