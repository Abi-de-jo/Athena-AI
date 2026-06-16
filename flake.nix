{
  description = "Rimuru AI development flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { self, nixpkgs, ... }:
    let
      systems = [
        "aarch64-linux"
        "x86_64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
      forEachSystem = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
      rev = self.shortRev or self.dirtyShortRev or "dirty";
    in
    {
      devShells = forEachSystem (pkgs: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            bun
            nodejs_20
            pkg-config
            openssl
            git
          ];
        };
      });

      overlays = {
        default =
          final: _prev:
          let
            node_modules = final.callPackage ./nix/node_modules.nix {
              inherit rev;
            };
          in
          rec {
            rimuru-ai = final.callPackage ./nix/opencode.nix {
              inherit node_modules;
            };
            rimuru-desktop = final.callPackage ./nix/desktop.nix {
              inherit (final.callPackage ./nix/opencode.nix { inherit node_modules; }) node_modules version src;
            };
          };
      };

      packages = forEachSystem (
        pkgs:
        let
          node_modules = pkgs.callPackage ./nix/node_modules.nix {
            inherit rev;
          };
          opencode_pkg = pkgs.callPackage ./nix/opencode.nix {
            inherit node_modules;
          };
        in
        rec {
          default = rimuru-ai;
          rimuru-ai = opencode_pkg;
          rimuru-desktop = pkgs.callPackage ./nix/desktop.nix {
            inherit (opencode_pkg) node_modules version src;
          };
          # Updater derivation with fakeHash - build fails and reveals correct hash
          node_modules_updater = node_modules.override {
            hash = pkgs.lib.fakeHash;
          };
        }
      );
    };
}
