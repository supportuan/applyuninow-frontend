import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { connectStore } from '../utils/helpers';

const LoginContactUs = () => {
  return (
    <div className="login-contact-section">
      <h3 className="login-contact-heading">Contact Us Now</h3>
      <p className="login-contact-subtext">Get in touch with our team</p>
      <div className="login-contact-links">
        {connectStore.map((item) => (
          <Link
            key={item.name}
            href={`/connect${item.routename}`}
            className="login-contact-link"
          >
            <Image src={item.icon} alt={item.name} width={28} height={28} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LoginContactUs;
