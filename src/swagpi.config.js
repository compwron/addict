// This JSON is used to auto-build the API docs
// (swagpi on NPM). If you like this format, give
// me a shout out and I'll clean up the library and
// publish it on Github.

const filterQuery = {
  _fields: 'Common-delimited field names to return.',
  _q: 'Searches all fields for given string.',
  _start: 'Result index to start from.',
  _end: 'Result index to end from.'
};

const params = {
  user: 'The user logon name.',
  group: 'The group name.',
  ou: 'The OU name.'
};

module.exports = {
  Users: [
    {
      verb: 'GET',
      route: '/user',
      title: 'Get all users',
      description: 'Pulls all users in Active Directory, with filters.',
      queries: filterQuery
    },
    {
      verb: 'POST',
      route: '/user',
      title: 'Add a user',
      description: 'Adds a new user to Active Directory.',
      queries: {
        commonName: {
          description: "Equivalent to the user's full name.",
          optional: false
        },
        userName: {
          description: 'User name.',
          optional: false
        },
        pass: {
          description: 'Password to log in.',
          optional: false
        },
        firstName: 'First name',
        lastName: 'Last name.',
        email: 'Email address.',
        title: 'Job title.',
        location: 'Relative AD folder position.'
      }
    },
    {
      verb: 'GET',
      route: '/user/:user',
      title: 'Get a single user',
      description: 'Pulls a single user.',
      params: { user: params.user },
      queries: filterQuery
    },
    {
      verb: 'PUT',
      route: '/user/:user',
      title: 'Update a user',
      description: 'Updates properties of a user.',
      params: { user: params.user },
      queries: {
        firstName: 'First name of user.',
        lastName: 'Last name of user.',
        commonName: 'Full name of user.',
        email: 'Email address of user.',
        title: 'Job title of user.',
        password: 'Password of user.',
        userName: 'Username of user.',
        enabled: 'Whether the account is enabled.',
        passwordExpires: 'Whether the password should expire.'
      }
    },
    {
      verb: 'GET',
      route: '/user/:user/exists',
      title: 'User exists',
      description: 'Returns whether a user exists or not.',
      params: { user: params.user }
    },
    {
      verb: 'GET',
      route: '/user/:user/member-of/:group',
      title: 'User is a member of group',
      description: 'Returns whether a user is a member of a group or not.',
      params: { user: params.user, group: params.group }
    },
    {
      verb: 'POST',
      route: '/user/:user/authenticate',
      title: 'Authenticate a user',
      description: 'Runs a username and password against AD.',
      params: { user: params.user },
      queries: {
        password: {
          description: "The user's password.",
          optional: false
        }
      }
    },
    {
      verb: 'PUT',
      route: '/user/:user/password',
      title: 'Change a password',
      description: "Changes the user's password",
      params: { user: params.user },
      queries: {
        password: {
          description: "The user's password.",
          optional: false
        }
      }
    },
    {
      verb: 'PUT',
      route: '/user/:user/password-never-expires',
      title: 'Set password never expires',
      description: 'Sets the password to never expire.',
      params: { user: params.user },
      queries: {}
    },
    {
      verb: 'PUT',
      route: '/user/:user/password-expires',
      title: 'Set password expires',
      description: 'Sets the password to eventually expire.',
      params: { user: params.user },
      queries: {}
    },
    {
      verb: 'PUT',
      route: '/user/:user/enable',
      title: 'Enable a user',
      description: "Enables the user's account.",
      params: { user: params.user },
      queries: {}
    },
    {
      verb: 'PUT',
      route: '/user/:user/disable',
      title: 'Disable a user',
      description: "Disables the user's account.",
      params: { user: params.user },
      queries: {}
    },
    {
      verb: 'PUT',
      route: '/user/:user/move',
      title: 'Move a user',
      description:
        'Moves a user to a new location relative to the directory root.',
      params: { user: params.user },
      queries: {
        location: {
          description: "The new position, separated by '/'.",
          optional: false
        }
      }
    },
    {
      verb: 'PUT',
      route: '/user/:user/unock',
      title: 'Unlock a user',
      description: 'Unlocks a user.',
      params: { user: params.user }
    },
    {
      verb: 'DELETE',
      route: '/user/:user',
      title: 'Remove a user',
      description: 'Removes a user from Active Directory.',
      params: { user: params.user }
    }
  ],
  Groups: [
    {
      verb: 'GET',
      route: '/group',
      title: 'Get all groups',
      description: 'Pulls all groups in Active Directory, with filters.',
      queries: filterQuery
    },
    {
      verb: 'POST',
      route: '/group',
      title: 'Add a group',
      description: 'Adds a new group to Active Directory.',
      queries: {
        name: {
          description: 'Name of the Group as displayed.',
          optional: false
        },
        description: 'Description of the Security Group.',
        location: 'Relative AD position, separated by /.'
      }
    },
    {
      verb: 'GET',
      route: '/group/:group',
      title: 'Get a single group',
      description: 'Pulls a single group.',
      params: { group: params.group },
      queries: filterQuery
    },
    {
      verb: 'GET',
      route: '/group/:group/exists',
      title: 'Group exists',
      description: 'Returns whether a group exists or not.',
      params: { group: params.group }
    },
    {
      verb: 'POST',
      route: '/group/:group/user/:user',
      title: 'Add user to group',
      description: 'Adds a user to a group.',
      params: { group: params.group, user: params.user }
    },
    {
      verb: 'DELETE',
      route: '/group/:group/user/:user',
      title: 'Remove user from group',
      description: 'Removes a user from a group.',
      params: { group: params.group, user: params.user }
    },
    {
      verb: 'DELETE',
      route: '/group/:group',
      title: 'Remove a group',
      description: 'Removes the group from Active Directory.',
      params: { group: params.group }
    }
  ],
  'Organization Units': [
    {
      verb: 'GET',
      route: '/ou',
      title: 'Get all OUs',
      description:
        'Pulls all Organization Units in Active Directory, with filters.',
      queries: filterQuery
    },
    {
      verb: 'POST',
      route: '/ou',
      title: 'Add an OU',
      description: 'Adds a new OU to Active Directory.',
      queries: {
        name: {
          description: 'Name of the OU as displayed.',
          optional: false
        },
        description: 'Description of the OU.',
        location: 'Relative AD position, separated by /.'
      }
    },
    {
      verb: 'GET',
      route: '/ou/:ou',
      title: 'Get a single OU',
      description: 'Pulls a single OU.',
      params: { ou: params.ou },
      queries: filterQuery
    },
    {
      verb: 'GET',
      route: '/ou/:ou/exists',
      title: 'OU exists',
      description: 'Returns whether a OU exists or not.',
      params: { ou: params.ou }
    },
    {
      verb: 'DELETE',
      route: '/ou/:ou',
      title: 'Remove an OU',
      description: 'Removes the OU from Active Directory.',
      params: { ou: params.ou }
    }
  ],
  Other: [
    {
      verb: 'GET',
      route: '/other',
      title: 'Get all other Objects',
      description: 'Pulls all non-User/Group Active Directory objects.',
      queries: filterQuery
    },
    {
      verb: 'GET',
      route: '/all',
      title: 'Get all Objects',
      description: 'Pulls all Active Directory objects.',
      queries: filterQuery
    },
    {
      verb: 'GET',
      route: '/find/:filter',
      title: 'Search Active Directory',
      description: 'Does a raw Active Directory search.',
      params: {
        filter: 'Search filter, such as CN=da*.'
      },
      queries: filterQuery
    },
    {
      verb: 'GET',
      title: 'Get API status',
      route: '/status',
      description: 'Gives the uptime and status of the API.'
    }
  ]
};
