import { AccessCheckJob } from "@guildxyz/types";
import { OnPoll, SignerFunction, awaitJob, callGuildAPI } from "../../utils";

const accessCheck = {
  start: (guildId: number, signer: SignerFunction) =>
    callGuildAPI<{ jobId: string }>({
      url: "/actions/access-check",
      method: "POST",
      body: {
        schema: "JoinActionPayloadSchema",
        data: { guildId },
      },
      signer,
    }),

  poll: (guildId: number, signer: SignerFunction) =>
    callGuildAPI<AccessCheckJob[]>({
      url: "/actions/access-check",
      method: "GET",
      queryParams: { guildId },
      signer,
    }).then(([firstJob = null]) => firstJob),

  await: (
    guildId: number,
    signer: SignerFunction,
    onPoll?: OnPoll<AccessCheckJob>,
    pollIntervalMs?: number
  ) =>
    awaitJob(() => accessCheck.poll(guildId, signer), onPoll, pollIntervalMs),
};

export default accessCheck;
