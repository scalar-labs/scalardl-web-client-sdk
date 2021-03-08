CREATE KEYSPACE IF NOT EXISTS foo WITH REPLICATION ={'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE foo.bar (
	column_a TEXT,
	column_b TEXT,

	before_column_b TEXT,

	tx_id text,
	tx_prepared_at bigint,
	tx_committed_at bigint,
	tx_state int,
	tx_version int,

	before_tx_id text,
	before_tx_prepared_at bigint,
	before_tx_committed_at bigint,
	before_tx_state int,
	before_tx_version int,

	PRIMARY KEY (column_a),
);
