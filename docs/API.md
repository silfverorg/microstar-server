# API Docs

## General

Will return if server is ok
```
curl -XGET 'localhost:3000/'
```

## Track

Will track an event
```
curl -XPOST 'localhost:3000/track' -d '{"event": "My event", "data": {"id": 1}}'
```

## Fetch

Will return all entries
```
curl -XGET 'localhost:3000/fetch'
```
