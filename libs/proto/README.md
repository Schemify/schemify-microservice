compilar proto

npx protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=./ --ts_proto_opt=nestJs=true ./libs/proto/services/example.proto

nest build proto