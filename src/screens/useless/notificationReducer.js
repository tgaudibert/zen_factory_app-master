const notificationState = {
  notifications: [
    {
      id: 0,
      read: false,
      authorName: 'Mark Cuban',
      authorImg:
        'https://scontent.fotp1-1.fna.fbcdn.net/v/t1.0-9/14064032_1211439115574722_4008304366512255154_n.jpg?_nc_cat=108&_nc_oc=AQnBE7o9_hppxwN1vTI9pf7psutWjHM8yrRyT8FujlPuDQfSeX6_t7n8L7OU6_G-428&_nc_ht=scontent.fotp1-1.fna&oh=dc47657793c14d6b1697f4e1af37bde6&oe=5DE8E357',
      text: 'left 2 comments on your post.',
      time: '6 minutes ago'
    },
    {
      id: 2,
      read: true,
      authorName: 'Chris Sacca',
      authorImg:
        'https://scontent.fotp1-1.fna.fbcdn.net/v/t1.0-9/59674324_2261721850570095_6556096281163333632_n.jpg?_nc_cat=107&_nc_oc=AQmnkVMLT3VaOFyUEkZ6er4A6OJWInCfTr--xYaeUFyHLPj6sNvBDxHIK8KS5eE5YBA&_nc_ht=scontent.fotp1-1.fna&oh=a543f0b39c4f06ff6c3652215282ff4a&oe=5DABFE53',
      text: 'left a comment on your post "Keep up the good work" ! ',
      time: '6 minutes ago'
    }
  ]
};

export const notificationReducer = (state = notificationState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_NOTIFICATIONS': {
      newState.notifications.map(data => {
        if (data.id == action.id) {
          data.read = true;
        }
      });
      break;
    }
    default:
      return newState;
  }

  return newState;
};
