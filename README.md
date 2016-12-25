#### About
Move & Twist is a polish-targetted mobile house renting app

#### Setup
* Install docker (depending on your platform)
* run docker app/daemon

Setup infrastructure for dev (mongodb + nodejs)
```
./console up
```

Login to the SSH of node server
```
./console ssh
```

##### Additional infra options
To login to mongo shell use
```
./console mongoshell
```

To destroy all servers/containers use
```
./console down
```

### API instructions
While on npm server run
```
npm run server
```
