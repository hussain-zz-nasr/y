'use client';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>About Us</h1>
      <p>Welcome to our website! We are a small team dedicated to providing high-quality content and services.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, feel free to reach out!</p>

      <h3>Our Contact Information</h3>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:contact@example.com">contact@example.com</a></li>
        <li><strong>Phone:</strong> +1 (123) 456-7890</li>
        <li><strong>Address:</strong> 123 Street Name, City, Country</li>
      </ul>
      
      <h3>Contact Form</h3>
      
      <form
      

        onSubmit={(e) => {  
          e.preventDefault();
          alert('Form submitted');
        }}
      
      >
        
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Send Message</button>
        
      </form>
      <p>
        <Link href="/">Back to Home</Link>
      </p>
      
    </div>
    
  );
}