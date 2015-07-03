@echo off
@echo use icadev for password
keytool -genkey -v -keystore barapp.keystore -alias bar -keyalg RSA -keysize 2048 -validity 10000
