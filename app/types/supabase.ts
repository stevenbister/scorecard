/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/game_stats": {
    get: {
      parameters: {
        query: {
          user_id?: parameters["rowFilter.game_stats.user_id"];
          player_id?: parameters["rowFilter.game_stats.player_id"];
          games_played?: parameters["rowFilter.game_stats.games_played"];
          wins?: parameters["rowFilter.game_stats.wins"];
          draws?: parameters["rowFilter.game_stats.draws"];
          losses?: parameters["rowFilter.game_stats.losses"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["game_stats"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** game_stats */
          game_stats?: definitions["game_stats"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          user_id?: parameters["rowFilter.game_stats.user_id"];
          player_id?: parameters["rowFilter.game_stats.player_id"];
          games_played?: parameters["rowFilter.game_stats.games_played"];
          wins?: parameters["rowFilter.game_stats.wins"];
          draws?: parameters["rowFilter.game_stats.draws"];
          losses?: parameters["rowFilter.game_stats.losses"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          user_id?: parameters["rowFilter.game_stats.user_id"];
          player_id?: parameters["rowFilter.game_stats.player_id"];
          games_played?: parameters["rowFilter.game_stats.games_played"];
          wins?: parameters["rowFilter.game_stats.wins"];
          draws?: parameters["rowFilter.game_stats.draws"];
          losses?: parameters["rowFilter.game_stats.losses"];
        };
        body: {
          /** game_stats */
          game_stats?: definitions["game_stats"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/players": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.players.id"];
          user_id?: parameters["rowFilter.players.user_id"];
          created_at?: parameters["rowFilter.players.created_at"];
          name?: parameters["rowFilter.players.name"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["players"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** players */
          players?: definitions["players"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.players.id"];
          user_id?: parameters["rowFilter.players.user_id"];
          created_at?: parameters["rowFilter.players.created_at"];
          name?: parameters["rowFilter.players.name"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.players.id"];
          user_id?: parameters["rowFilter.players.user_id"];
          created_at?: parameters["rowFilter.players.created_at"];
          name?: parameters["rowFilter.players.name"];
        };
        body: {
          /** players */
          players?: definitions["players"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/games": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.games.id"];
          created_at?: parameters["rowFilter.games.created_at"];
          players?: parameters["rowFilter.games.players"];
          active?: parameters["rowFilter.games.active"];
          winner?: parameters["rowFilter.games.winner"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["games"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** games */
          games?: definitions["games"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.games.id"];
          created_at?: parameters["rowFilter.games.created_at"];
          players?: parameters["rowFilter.games.players"];
          active?: parameters["rowFilter.games.active"];
          winner?: parameters["rowFilter.games.winner"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.games.id"];
          created_at?: parameters["rowFilter.games.created_at"];
          players?: parameters["rowFilter.games.players"];
          active?: parameters["rowFilter.games.active"];
          winner?: parameters["rowFilter.games.winner"];
        };
        body: {
          /** games */
          games?: definitions["games"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          created_at?: parameters["rowFilter.profiles.created_at"];
          email?: parameters["rowFilter.profiles.email"];
          name?: parameters["rowFilter.profiles.name"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          created_at?: parameters["rowFilter.profiles.created_at"];
          email?: parameters["rowFilter.profiles.email"];
          name?: parameters["rowFilter.profiles.name"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          created_at?: parameters["rowFilter.profiles.created_at"];
          email?: parameters["rowFilter.profiles.email"];
          name?: parameters["rowFilter.profiles.name"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  game_stats: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    user_id?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `players.id`.<fk table='players' column='id'/>
     */
    player_id?: string;
    /** Format: bigint */
    games_played?: number;
    /** Format: bigint */
    wins?: number;
    /** Format: bigint */
    draws?: number;
    /** Format: bigint */
    losses?: number;
  };
  players: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /** Format: uuid */
    user_id: string;
    /**
     * Format: timestamp with time zone
     * @default CURRENT_TIMESTAMP
     */
    created_at: string;
    /** Format: character varying */
    name?: string;
  };
  games: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default CURRENT_TIMESTAMP
     */
    created_at: string;
    /** Format: ARRAY */
    players?: unknown[];
    /**
     * Format: boolean
     * @default false
     */
    active: boolean;
    /** Format: uuid */
    winner?: string;
  };
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default CURRENT_TIMESTAMP
     */
    created_at: string;
    /** Format: character varying */
    email: string;
    /** Format: character varying */
    name?: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description game_stats */
  "body.game_stats": definitions["game_stats"];
  /** Format: uuid */
  "rowFilter.game_stats.user_id": string;
  /** Format: uuid */
  "rowFilter.game_stats.player_id": string;
  /** Format: bigint */
  "rowFilter.game_stats.games_played": string;
  /** Format: bigint */
  "rowFilter.game_stats.wins": string;
  /** Format: bigint */
  "rowFilter.game_stats.draws": string;
  /** Format: bigint */
  "rowFilter.game_stats.losses": string;
  /** @description players */
  "body.players": definitions["players"];
  /** Format: uuid */
  "rowFilter.players.id": string;
  /** Format: uuid */
  "rowFilter.players.user_id": string;
  /** Format: timestamp with time zone */
  "rowFilter.players.created_at": string;
  /** Format: character varying */
  "rowFilter.players.name": string;
  /** @description games */
  "body.games": definitions["games"];
  /** Format: uuid */
  "rowFilter.games.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.games.created_at": string;
  /** Format: ARRAY */
  "rowFilter.games.players": string;
  /** Format: boolean */
  "rowFilter.games.active": string;
  /** Format: uuid */
  "rowFilter.games.winner": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.profiles.created_at": string;
  /** Format: character varying */
  "rowFilter.profiles.email": string;
  /** Format: character varying */
  "rowFilter.profiles.name": string;
}

export interface operations {}

export interface external {}
