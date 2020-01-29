package com.org1.function;

import com.scalar.db.api.Put;
import com.scalar.db.io.Key;
import com.scalar.db.io.TextValue;
import com.scalar.db.io.Value;
import com.scalar.dl.ledger.database.Database;
import com.scalar.dl.ledger.function.Function;
import java.util.Optional;
import javax.json.JsonObject;

public class TestFunction extends Function {
  @Override
  public void invoke(
          Database database,
          Optional<JsonObject> functionArgument,
          JsonObject contractArgument,
          Optional<JsonObject> contractProperties) {
    String mockedId = contractArgument.getString("asset_id");
    Put put =
            (new Put(new Key(new Value[] {new TextValue("column_a", mockedId)})))
                    .forNamespace("foo")
                    .forTable("bar");
    database.put(put);
  }
}
