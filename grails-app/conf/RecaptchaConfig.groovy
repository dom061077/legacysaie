recaptcha {
    // These keys are generated by the ReCaptcha service
    publicKey  = "6Lco8fQSAAAAAIo2qfbxYL04QmkowFjBChV2beYu"
    privateKey = "6Lco8fQSAAAAAGqV7MBWYPAnn3V0jNQNYO_BFlh_"

	// Include the noscript tags in the generated captcha
	includeNoScript = true
}

mailhide {
    // Generated by the Mailhide service
    publicKey  = "6LdgZswSAAAAAIwB17N_vI_6JlV9o9vuxtmZde5_"//publicKey = "6LfTZcwSAAAAAISkWiE7aqtH3xa7vdmu7GL9O7bm"
    privateKey = "6LdgZswSAAAAANpUtWajRu5gbG0AK4b-QaetkUnU"//privateKey = "6LfTZcwSAAAAAPI6fiz2iRkuG19QN3LYOlQVDhHS"

}

environments {
  development {
    recaptcha {
      // Set to false to disable the display of captcha
      enabled = true

      // Communicate using HTTPS
      useSecureAPI = true
    }
  }
  production {
    recaptcha {
      // Set to false to disable the display of captcha
      enabled = true

      // Communicate using HTTPS
      useSecureAPI = true
    }
  }
}