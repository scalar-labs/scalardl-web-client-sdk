package com.org1.contract;

import com.scalar.dl.ledger.asset.Asset;
import com.scalar.dl.ledger.contract.Contract;
import com.scalar.dl.ledger.exception.ContractContextException;
import com.scalar.dl.ledger.database.Ledger;
import java.util.Optional;
import javax.json.Json;
import javax.json.JsonNumber;
import javax.json.JsonObject;

public class StateUpdater extends Contract {

  @Override
  public JsonObject invoke(Ledger ledger, JsonObject argument, Optional<JsonObject> properties) {
    if (argument.containsKey("asset_id") && argument.containsKey("state")) {
      if (!properties.isPresent()) {
        throw new ContractContextException("please set a properties");
      } else {
        String assetId = argument.getString("asset_id");
        String propertiesValue = ((JsonObject) properties.get()).getString("properties");
        JsonNumber state = argument.getJsonNumber("state");
        Optional<Asset> asset = ledger.get(assetId);
        JsonObject jsonObject =
                Json.createObjectBuilder()
                        .add("asset_id", assetId)
                        .add("state", state)
                        .add("properties", propertiesValue)
                        .build();
        if (!asset.isPresent() || ((Asset) asset.get()).data().getJsonNumber("state") != state) {
          ledger.put(assetId, Json.createObjectBuilder().add("state", state).build());
        }

        return jsonObject;
      }
    } else {
      throw new ContractContextException("please set asset_id and state in the argument");
    }
  }
}
