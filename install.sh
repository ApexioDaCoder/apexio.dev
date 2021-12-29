curl -fsSL https://deno.land/x/install/install.sh | sh
if hash deno 2>/dev/null
then
  deno run -A https://deno.land/x/aleph/install.ts
  cd apexio.dev
  aleph dev
fi