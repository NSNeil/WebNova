(function () {
    window.GameObject = function () {

    }
    GameObject.prototype.subscribe = (topic, listener, cb) => {
        // if (!window.topics.hasOwnProperty.call(topics, topic)) {
        if (!window.topics.hasOwnProperty(topic)) {
            window.topics[topic] = {'listeners':[]}
        }
        // Add the listener to queue
        var index = topics[topic].listeners.push(listener) - 1
        listener.cb = cb
        // Provide handle back for removal of topic
        return {
            remove: function () {
                delete topics[topic][index];
            }
        }
    }
    GameObject.prototype.publish = (topic, info) => {
        // If the topic doesn't exist, or there's no listeners in queue, just leave
        if (!window.topics.hasOwnProperty(topic)) return;

        // Cycle through topic listener call backs queue and fire event
        topics[topic].listeners.forEach(function (listener) {
            listener.cb(info != undefined ? info : {});
        });
    }
})()