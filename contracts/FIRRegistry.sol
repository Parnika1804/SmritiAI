// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract FIRRegistry {
    mapping(string => string) public firHashes;
    function storeFIR(string memory caseId, string memory hash) public {
        firHashes[caseId] = hash;
    }
    function verifyFIR(string memory caseId, string memory hash) public view returns (bool) {
        return keccak256(bytes(firHashes[caseId])) == keccak256(bytes(hash));
    }
}