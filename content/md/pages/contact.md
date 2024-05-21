{:title "Contact Us"
 :layout :page
 :page-index 4
 :navbar? true
 :to-root "../.."}

## Name
<div>
    <div class="contact-input-helper-text name">
        *This field cannot be empty
    </div>
    <input class="contact-input" data-type="contact-name" label="text" name="Name" placeholder="Name" required></input>
</div>

## Email
<div>
    <div class="contact-input-helper-text email">
        *This field cannot be empty
    </div>
    <div class="contact-input-helper-text emailFormat">
        *Email not in right format
    </div>
    <input class="contact-input" data-type="contact-email" label="email" name="Email" placeholder="email@eemail.email" required></input>
</div>

## Message
<div>
    <div class="contact-input-helper-text message">
        *This field cannot be empty
    </div>
    <textarea class="contact-input" data-type="contact-message" name="Message" placeholder="Message" cols=88 rows=8 required autofill></textarea>
</div>

<br>

<div>
    <a href="#" class="button" data-type="contact-submit">Submit</a>
    <div class="submit-success">
        &#x2714; Submitted Successfully
    </div>
    <div class="submit-error">
        &#x274C; Submit Error: make sure you have access to the internet, or try again later
    </div>
</div>
