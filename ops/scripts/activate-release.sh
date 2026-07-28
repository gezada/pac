#!/usr/bin/env bash

set -euo pipefail

readonly pac_web_root="/srv/pac/web"
readonly releases_dir="${pac_web_root}/releases"

release_id="${1:-}"
incoming_dir="${2:-}"

fail() {
  printf 'PAC deploy error: %s\n' "$1" >&2
  exit 1
}

[[ ${#release_id} -eq 40 ]] ||
  fail "release id must be a full 40-character Git commit SHA"
[[ "${release_id}" != *[!0-9a-f]* ]] ||
  fail "release id contains invalid characters"

expected_prefix="${releases_dir}/.incoming-${release_id}-"
[[ "${incoming_dir}" == "${expected_prefix}"* ]] ||
  fail "incoming directory is outside the allowed PAC release prefix"
[[ -d "${incoming_dir}" ]] ||
  fail "incoming release directory does not exist"
[[ -f "${incoming_dir}/index.html" ]] ||
  fail "incoming release does not contain index.html"

if find "${incoming_dir}" -type l -print -quit | grep -q .; then
  fail "incoming release must not contain symbolic links"
fi

release_dir="${releases_dir}/${release_id}"
[[ ! -e "${release_dir}" ]] ||
  fail "immutable release already exists: ${release_id}"

mv -- "${incoming_dir}" "${release_dir}"

next_link="${pac_web_root}/.current-${release_id}"
[[ ! -e "${next_link}" && ! -L "${next_link}" ]] ||
  fail "temporary current link already exists"

ln -s -- "${release_dir}" "${next_link}"
mv -Tf -- "${next_link}" "${pac_web_root}/current"

printf 'PAC release activated: %s\n' "${release_id}"
