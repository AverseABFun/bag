// @generated by protoc-gen-connect-es v1.1.4 with parameter "target=ts"
// @generated from file eliza.proto (package connectrpc.eliza.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { SayRequest, SayResponse, SlackActionRequest, SlackActionResponse } from "./eliza_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service connectrpc.eliza.v1.ElizaService
 */
export const ElizaService = {
  typeName: "connectrpc.eliza.v1.ElizaService",
  methods: {
    /**
     * Response to request
     *
     * @generated from rpc connectrpc.eliza.v1.ElizaService.Say
     */
    say: {
      name: "Say",
      I: SayRequest,
      O: SayResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc connectrpc.eliza.v1.ElizaService.BidirectionalRPC
     */
    bidirectionalRPC: {
      name: "BidirectionalRPC",
      I: SayRequest,
      O: SayResponse,
      kind: MethodKind.BiDiStreaming,
    },
    /**
     * @generated from rpc connectrpc.eliza.v1.ElizaService.AddSlackAction
     */
    addSlackAction: {
      name: "AddSlackAction",
      I: SlackActionRequest,
      O: SlackActionResponse,
      kind: MethodKind.BiDiStreaming,
    },
  }
} as const;
