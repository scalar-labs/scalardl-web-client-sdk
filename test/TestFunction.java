package com.org1.function;

import com.scalar.ledger.database.MutableDatabase;
import com.scalar.ledger.udf.Function;
import java.util.Optional;
import javax.json.JsonObject;

public class TestFunction extends Function {

  @Override
  public void invoke(MutableDatabase mutableDatabase, JsonObject jsonObject,
      Optional<JsonObject> optional) {
  }
}
