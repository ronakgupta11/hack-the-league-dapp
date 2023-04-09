export const proofReq = {
    "id": "7f38a193-0918-4a48-9fac-36adfdb8b542",
    "typ": "application/iden3comm-plain-json",
    "type": "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    "thid": "7f38a193-0918-4a48-9fac-36adfdb8b542",
    "body": {
        "reason": "credit verification",
        "transaction_data": {
            "contract_address": "0xeA0D144814Fdd5B6A6B0F89c72846A09Eb9c7346",
            "method_id": "b68967e2",
            "chain_id": 80001,
            "network": "polygon-mumbai"
        },
        "scope": [
            {
                "id": 1,
                "circuitId": "credentialAtomicQuerySigV2OnChain",
                "query": {
                    "allowedIssuers": [
                        "*"
                    ],
                    "context": "https://raw.githubusercontent.com/ronakgupta11/hack-the-league-dapp/main/schema/proof-of-creditEligible.jsonld",
                    "credentialSubject": {
                        "creditScore": {
                            "$eq": 600
                        }
                    },
                    "type": "ProofOfCreditEligiblity"
                }
            }
        ]
    }
}