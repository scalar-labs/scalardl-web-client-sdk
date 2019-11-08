package com.org1.contract;

import com.scalar.ledger.asset.Asset;
import com.scalar.ledger.contract.Contract;
import com.scalar.ledger.exception.ContractContextException;
import com.scalar.ledger.ledger.Ledger;
import java.util.Optional;
import javax.json.Json;
import javax.json.JsonObject;

public class StateUpdater extends Contract {

  @Override
  public JsonObject invoke(Ledger ledger, JsonObject argument, Optional<JsonObject> properties) {
    if (!argument.containsKey("asset_id") || !argument.containsKey("state")) {
      // ContractContextException is the only throwable exception in a contract and
      // it should be thrown when a contract faces some non-recoverable error
      throw new ContractContextException("please set asset_id and state in the argument");
    }
    if (!properties.isPresent()) {
      throw new ContractContextException("please set a properties");
    }

    String assetId = argument.getString("asset_id");
    String propertiesValue = properties.get().getString("properties");
    int state = argument.getInt("state");

    Optional<Asset> asset = ledger.get(assetId);
    JsonObject jsonObject = Json.createObjectBuilder().add("asset_id", assetId).add("state", state)
        .add("properties", propertiesValue).build();

    if (!asset.isPresent() || asset.get().data().getInt("state") != state) {
      ledger.put(assetId, Json.createObjectBuilder().add("state", state).build());
    }

    return jsonObject;
  }
}
