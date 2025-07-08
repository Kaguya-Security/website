// Test script to inject into the page
console.log('Testing notification system...');

setTimeout(() => {
    console.log('Attempting to call showNotification...');
    if (typeof showNotification === 'function') {
        console.log('showNotification function exists');
        showNotification('This is a test notification!', 'error');
        console.log('Notification called');
    } else {
        console.log('showNotification function not found');
        console.log('Available functions:', Object.getOwnPropertyNames(window).filter(name => typeof window[name] === 'function'));
    }
}, 2000);
