export const getAllMessages = (token) => {
    return fetch(`https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=${token}`)
    .then(response => response.json())
}

export const getLastMessages = (token, messageTime) => {
    return fetch(`https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?since=${messageTime}&limit=10&token=${token}`)
    .then(response => response.json())
}

export const sendMessage = (user, messageText) => {
    return fetch("https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        token: user.token,
        },
      body: JSON.stringify({
        message: messageText,
        author:  user.name
      }),
    }).then(response => response.json())
  };
