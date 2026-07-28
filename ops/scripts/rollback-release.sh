#!/usr/bin/env bash

set -euo pipefail

readonly pac_web_root="/srv/pac/web"
readonly releases_dir="${pac_web_root}/releases"

release_id="${1:-}"

fail() {
  printf 'PAC rollback error: %s\n' "$1" >&2
  exit 1
}

[[ ${#release_id} -eq 40 ]] ||
  fail "release id must be a full 40-character Git commit SHA"
[[ "${release_id}" != *[!0-9a-f]* ]] ||
  fail "release id contains invalid characters"

release_dir="${releases_dir}/${release_id}"
[[ -d "${release_dir}" && -f "${release_dir}/index.html" ]] ||
  fail "requested PAC release is not healthy or does not exist"

next_link="${pac_web_root}/.rollback-${release_id}"
[[ ! -e "${next_link}" && ! -L "${next_link}" ]] ||
  fail "temporary rollback link already exists"

ln -s -- "${release_dir}" "${next_link}"
mv -Tf -- "${next_link}" "${pac_web_root}/current"

printf 'PAC rollback activated: %s\n' "${release_id}"
