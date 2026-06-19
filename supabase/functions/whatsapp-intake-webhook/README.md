# whatsapp-intake-webhook local verification notes

Required environment variables:

- `WHATSAPP_VERIFY_TOKEN` (used by `GET` setup verification).
- `WHATSAPP_APP_SECRET` (used to verify `POST` payload signatures).

For `POST` webhook calls, send the header in this format:

- `X-Hub-Signature-256: sha256=<lowercase_hex_hmac>`

Where `<lowercase_hex_hmac>` is the HMAC-SHA256 of the **raw request body** using `WHATSAPP_APP_SECRET`.

Example shell snippet to compute a signature for local testing:

```bash
BODY='{"object":"whatsapp_business_account","entry":[]}'
SIG=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$WHATSAPP_APP_SECRET" -hex | sed 's/^.* //')
curl -i "$SUPABASE_FUNCTION_URL/whatsapp-intake-webhook" \
  -H "Content-Type: application/json" \
  -H "X-Hub-Signature-256: sha256=$SIG" \
  --data "$BODY"
```
