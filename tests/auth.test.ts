import { prepareRequest } from "../src/auth";
import { testWallet } from "./common";

describe("Check prepareRequest", () => {
  test("Check request without payload returns valid json", async () => {
    const preparedRequestString = await prepareRequest(testWallet);
    const preparedRequest = JSON.parse(preparedRequestString);
    expect(preparedRequest.payload).toStrictEqual({});
    expect(preparedRequest.validation.address).toBe(
      testWallet.address.toLowerCase()
    );
    expect(preparedRequest.validation.addressSignedMessage.length).toBe(132);
    expect(preparedRequest.validation.nonce.length).toBe(66);
    expect(preparedRequest.validation.random.length).toBe(44);
    expect(preparedRequest.validation.hash).toBe(undefined);
    expect(preparedRequest.validation.timestamp).not.toBeNull();
  });

  test("Check request with payload returns valid json", async () => {
    const payload = { test: 1234 };
    const preparedRequestString = await prepareRequest(testWallet, payload);
    const preparedRequest = JSON.parse(preparedRequestString);
    expect(preparedRequest.payload).toStrictEqual(payload);
    expect(preparedRequest.validation.address).toBe(
      testWallet.address.toLowerCase()
    );
    expect(preparedRequest.validation.addressSignedMessage.length).toBe(132);
    expect(preparedRequest.validation.nonce.length).toBe(66);
    expect(preparedRequest.validation.random.length).toBe(44);
    expect(preparedRequest.validation.hash.length).toBe(66);
    expect(preparedRequest.validation.timestamp).not.toBeNull();
  });
});
