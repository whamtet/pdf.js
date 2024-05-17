let timeout;

const delay = (f, delayT) => e => {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(() => f(e), delayT);
};